const express = require('express');
const router = express.Router();
const Pharma = require('../../models/Pharma');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.post('/createPharmaRecord',
    [check("Name").not().isEmpty(),
    check("Email").normalizeEmail().isEmail(),
    check("Phone").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ message: 'Failed to add a record, missing required field information.' });
        }


        const {
            Name,
            Phone,
            Email,
            Password,
            Notes
        } = req.body;

        let existingUser;
        try {
            existingUser = await Pharma.findOne({ Name: Name });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }


        const createdPharma = new Pharma({
            Name,
            Phone,
            Email,
            Password,
            Notes,
        });


        await createdPharma.save().then(() => {
            res.status(201).json({ Pharma: createdPharma.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchPharmaRecord',
    async (req, res) => {

        const {
            Name,
            Email,
            SearchType,
        } = req.body;

        let pharmaRecord;


        switch (SearchType) {
            case 'All':
                try {
                    pharmaRecord = await Pharma.find();
                    return res.status(200).json({ pharma: pharmaRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Name':
                try {
                    pharmaRecord = await Pharma.find({Name: Name });
                    return res.status(200).json({ pharma: pharmaRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Email':
                try {

                    pharmaRecord = await Pharma.find({ Email: Email });
                    return res.status(200).json({ pharma: pharmaRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;

        }

    });


router.get('/:id', async(req,res) => {
        try {
            const pharma = await Pharma.findById(req.params.id);
            if(!pharma) {
                return res.status(404).json({msg:'Record not found'});
            }
            res.json(pharma);
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
        const pharma = await Pharma.findById(req.params.id);
        if(!pharma) {
            return res.status(404).json({msg:'Record not found'});
        }
        await pharma.remove();
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
        const pharma = await Pharma.findById(req.params.id);
        if(!pharma) {
            return res.status(404).json({msg:'Record not found'});
        }

     
        const {
            Name,
            Phone,
            Email,
            Password,
            Notes
        } = req.body;

        const updatedPhmaraRecord = {
            Name,
            Phone,
            Email,
            Password,
            Notes
        }

        Object.assign(pharma,updatedPhmaraRecord);
   
        await pharma.save();
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