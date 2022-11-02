const express = require('express');
const router = express.Router();
const Rep = require('../../models/Rep');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.get('/RepFirstAndLastName', async(req,res) => {
    try {

        
        const manager = await Rep.find({}, {FirstName: 1, LastName: 1,_id: 0});
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

router.post('/createRepRecord',
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
            ManagerName,
            FirstName,
            LastName,
            Territory,
            Phone,
            Email,
            AnnualBudget,
            Notes,
        } = req.body;

        let existingUser;
        try {
            existingUser = await Rep.findOne({ Email: Email });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }


        const createdRep = new Rep({
            ManagerName,
            FirstName,
            LastName,
            Territory,
            Phone,
            Email,
            AnnualBudget,
            Notes,
        });


        await createdRep.save().then(() => {
            res.status(201).json({ Rep: createdRep.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchRepRecord',
    async (req, res) => {

        const {
            Territory,
            Email,
            ManagerName,
            SearchType,
        } = req.body;

        let RepRecord;


        switch (SearchType) {
            case 'All':
                try {
                    repRecord = await Rep.find();
                    return res.status(200).json({ Rep: repRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Territory':
                try {

                    repRecord = await Rep.find({ Territory: Territory });
                    return res.status(200).json({ Rep: repRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Email':
                try {

                    repRecord = await Rep.find({ Email: Email });
                    return res.status(200).json({ Rep: repRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;
            case 'ManagerName':
                try {

                    repRecord = await Rep.find({ ManagerName: ManagerName });
                    return res.status(200).json({ Rep: repRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }

        }

    });


router.get('/:id', async (req, res) => {
    try {
        const rep = await Rep.findById(req.params.id);
        if (!rep) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.json(rep);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(500).send('Server error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const rep = await Rep.findById(req.params.id);
        if (!rep) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        await rep.remove();
        res.json({ msg: 'Record removed' });

    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(500).send('Server error')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const rep = await Rep.findById(req.params.id);
        if (!rep) {
            return res.status(404).json({ msg: 'Record not found' });
        }


        const {
            ManagerName,
            FirstName,
            LastName,
            Territory,
            Phone,
            Email,
            AnnualBudget,
            Notes,
        } = req.body;

        const updatedRepRecord = {
            ManagerName,
            FirstName,
            LastName,
            Territory,
            Phone,
            Email,
            AnnualBudget,
            Notes,
        }

        Object.assign(rep, updatedRepRecord);

        await rep.save();
        return res.json({ msg: 'Record Information Updated' });

    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(500).send('Server error')
    }
})

module.exports = router;