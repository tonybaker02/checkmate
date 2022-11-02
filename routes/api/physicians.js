const express = require('express');
const router = express.Router();
const Physicians = require('../../models/Physicians');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.post('/createPhysiciansRecord',
    [check("NPI").not().isEmpty(),
    check("Email").normalizeEmail().isEmail(),
    check("LicenseID").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ message: 'Failed to add a record, missing required field information.' });
        }


        const {
            Title,
            FirstName,
            MI,
            LastName,
            NPI,
            LicenseID,
            Email,
            Phone,
            Password,
            Notes,
        } = req.body;

        let existingUser;
        try {
            existingUser = await Physicians.findOne({ LicenseID: LicenseID });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }


        const createdPhysicians = new Physicians({
            Title,
            FirstName,
            MI,
            LastName,
            NPI,
            LicenseID,
            Email,
            Phone,
            Password,
            Notes,
        });


        await createdPhysicians.save().then(() => {
            res.status(201).json({ physicians: createdPhysicians.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchPhysiciansRecord',
    async (req, res) => {

        const {
            LastName,
            LicenseID,
            Email,
            SearchType,
        } = req.body;

        let physiciansRecord;


        switch (SearchType) {
            case 'All':
                try {
                    physiciansRecord = await Physicians.find();
                    return res.status(200).json({ physicians: physiciansRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'LastName':
                try {
                    physiciansRecord = await Physicians.find({LastName: LastName });
                    return res.status(200).json({ physicians: physiciansRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
            case 'LicenseID':
                try {

                    physiciansRecord = await Physicians.find({ LicenseID: LicenseID });
                    return res.status(200).json({ physicians: physiciansRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;
                case 'Email':
                try {

                    physiciansRecord = await Physicians.find({ Email: Email });
                    return res.status(200).json({ physicians: physiciansRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' + error });
                }
                break;

        }

    });


router.get('/:id', async(req,res) => {
        try {
            const physicians = await Physicians.findById(req.params.id);
            if(!physicians) {
                return res.status(404).json({msg:'Record not found'});
            }
            res.json(physicians);
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
        const physicians = await Physicians.findById(req.params.id);
        if(!physicians) {
            return res.status(404).json({msg:'Record not found'});
        }
        await physicians.remove();
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
        const physicians = await Physicians.findById(req.params.id);
        if(!physicians) {
            return res.status(404).json({msg:'Record not found'});
        }

        const {
            Title,
            FirstName,
            MI,
            LastName,
            NPI,
            LicenseID,
            Email,
            Phone,
            Password,
            Notes,
        } = req.body;

        const updatedPhysiciansRecord = {
            Title,
            FirstName,
            MI,
            LastName,
            NPI,
            LicenseID,
            Email,
            Phone,
            Password,
            Notes,
        }

        Object.assign(physicians,updatedPhysiciansRecord);
   
        await physicians.save();
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