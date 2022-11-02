const express = require('express');
const router = express.Router();
const Manager = require('../../models/Manager');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.get('/fetchManagerFirstAndLastName', async(req,res) => {
    try {

        
        const manager = await Manager.find({}, {FirstName: 1, LastName: 1,_id: 0});
        if(!manager) {
            return res.status(404).json({msg:'Record not found'});
        }
        res.json(manager);
        
    } catch (err) {
        //console.log(err.message);
        
        if(err.kind =='ObjectId') {
            return res.status(404).json({msg:'Record not found'});
        }
        res.status(500).send('Server error')
        
    }
})

router.post('/createManagerRecord',
    [check("FirstName").not().isEmpty(),
    check("Email").normalizeEmail().isEmail(),
    check("Territory").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ message: 'Failed to add a record, missing required field information.' });
        }


        const {
            FirstName,
            LastName,
            Territory,
            Division,
            District,
            Phone,
            Mobile,
            Email,
            Notes,
        } = req.body;

        let existingUser;
        try {
            existingUser = await Manager.findOne({ Email: Email });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }


        const createdManager = new Manager({
            FirstName,
            LastName,
            Territory,
            Division,
            District,
            Phone,
            Mobile,
            Email,
            Notes,
        });


        await createdManager.save().then(() => {
            res.status(201).json({ Manager: createdManager.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchManagerRecord',
    async (req, res) => {

        const {
            Territory,
            Division,
            Email,
            SearchType,
        } = req.body;

        let ManagerRecord;


        switch (SearchType) {
            case 'All':
                try {
                    managerRecord = await Manager.find();
                    return res.status(200).json({ manager: managerRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Territory':
                try {
                    
                    managerRecord = await Manager.find({ Territory: Territory });
                    return res.status(200).json({ manager: managerRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
                case 'Division':
                    try {
                        managerRecord = await Manager.find({Division: Division });
                        return res.status(200).json({ manager: managerRecord })
                    } catch (error) {
                        return res.status(500).json({ message: 'No Records returned for your search' });
                    }
                    break;
            case 'Email':
                try {

                    managerRecord = await Manager.find({ Email: Email });
                    return res.status(200).json({ manager: managerRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;

        }

    });


router.get('/:id', async(req,res) => {
        try {
            const manager = await Manager.findById(req.params.id);
            if(!manager) {
                return res.status(404).json({msg:'Record not found'});
            }
            res.json(manager);
        } catch (err) {
            console.log(err.message);
            if(err.kind =='ObjectId') {
                return res.status(404).json({msg:'Record not found'});
            }
            res.status(500).send('Server error')
        }
})

router.delete('/:id', async(req,res) => {
    try {
        const manager = await Manager.findById(req.params.id);
        if(!manager) {
            return res.status(404).json({msg:'Record not found'});
        }
        await manager.remove();
        res.json({msg:'Record removed'});

    } catch (err) {
        console.log(err.message);
        if(err.kind =='ObjectId') {
            return res.status(404).json({msg:'Record not found'});
        }
        res.status(500).send('Server error')
    }
})

router.put('/:id', async(req,res) => {
    try {
        const manager = await Manager.findById(req.params.id);
        if(!Manager) {
            return res.status(404).json({msg:'Record not found'});
        }

     
        const {
            FirstName,
            LastName,
            Territory,
            Division,
            District,
            Phone,
            Mobile,
            Email,
            Notes,
        } = req.body;

        const updatedManagerRecord = {
            FirstName,
            LastName,
            Territory,
            Division,
            District,
            Phone,
            Mobile,
            Email,
            Notes,
        }

        Object.assign(manager,updatedManagerRecord);
   
        await manager.save();
        return res.json({msg:'Record Information Updated'});

    } catch (err) {
        console.log(err.message);
        if(err.kind =='ObjectId') {
            return res.status(404).json({msg:'Record not found'});
        }
        res.status(500).send('Server error')
    }
})




module.exports = router;