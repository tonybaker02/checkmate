const express = require('express');
const router = express.Router();
const MedicalGroup = require('../../models/MedicalGroup');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.post('/createMedicalGroupRecord',
    [check("Name").not().isEmpty(),
    check("Email").normalizeEmail().isEmail(),
    check("Address").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ message: 'Failed to add a record, missing required field information.' });
        }


        const {
            Name,
            Address,
            Office,
            Mobile,
            Email,
            Password,
            Notes,
        } = req.body;

        let existingUser;
        try {
            existingUser = await MedicalGroup.findOne({ Name: Name });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }


        const createdMedicalGroup = new MedicalGroup({
            Name,
            Address,
            Office,
            Mobile,
            Email,
            Password,
            Notes,
        });


        await createdMedicalGroup.save().then(() => {
            res.status(201).json({ medicalGroup: createdMedicalGroup.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchMedicalGroupRecord',
    async (req, res) => {

        const {
            Name,
            Email,
            SearchType,
        } = req.body;

        let medicalGroupRecord;


        switch (SearchType) {
            case 'All':
                try {
                    medicalGroupRecord = await MedicalGroup.find();
                    return res.status(200).json({ medicalGroup: medicalGroupRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Name':
                try {
                    medicalGroupRecord = await MedicalGroup.find({Name: Name });
                    return res.status(200).json({ medicalGroup: medicalGroupRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Email':
                try {

                    medicalGroupRecord = await MedicalGroup.find({ Email: Email });
                    return res.status(200).json({ medicalGroup: medicalGroupRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;

        }

    });


router.get('/:id', async(req,res) => {
        try {
            const medicalGroup = await MedicalGroup.findById(req.params.id);
            if(!medicalGroup) {
                return res.status(404).json({msg:'Record not found'});
            }
            res.json(medicalGroup);
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
        const medicalGroup = await MedicalGroup.findById(req.params.id);
        if(!medicalGroup) {
            return res.status(404).json({msg:'Record not found'});
        }
        await medicalGroup.remove();
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
        const medicalGroup = await MedicalGroup.findById(req.params.id);
        if(!medicalGroup) {
            return res.status(404).json({msg:'Record not found'});
        }

     
        const {
            Name,
            Address,
            Office,
            Mobile,
            Email,
            Password,
            Notes,
        } = req.body;

        const updatedMedicalGroupRecord = {
            Name,
            Address,
            Office,
            Mobile,
            Email,
            Password,
            Notes,
        }

        Object.assign(medicalGroup,updatedMedicalGroupRecord);
   
        await medicalGroup.save();
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