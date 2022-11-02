const express = require('express');
const router = express.Router();
const Receipt = require('../../models/Receipt');
const config = require('config')
const { check, validationResult } = require('express-validator')

router.post('/createReceiptRecord',
    [check("Rep").not().isEmpty(),
    check("Restaurant").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ message: 'Failed to add a record, missing required field information.' });
        }


        const {
            Rep,
            Restaurant,
            Amount,
            SharedAmount,
            Date,
            Event,
            Doctors,
            Notes,
        } = req.body;

        /*
        let existingUser;
        try {
            existingUser = await Receipt.findOne({ Email: Email });

        } catch (error) {
            return res.status(500).json({ message: 'Issue verifying if record exists' });
        }

        if (existingUser) {
            return res.status(500).json({ message: 'Record exists already..' });
        }
       */

        const createdReceipt = new Receipt({
            Rep,
            Restaurant,
            Amount,
            SharedAmount,
            Date,
            Event,
            Doctors,
            Notes,
        });


        await createdReceipt.save().then(() => {
            res.status(201).json({ Receipt: createdReceipt.toObject({ getters: true }) });
        })
            .catch((error) => {
                return res.status(500).json({ message: 'Failed add record. please try again: -' + error });
            });

        res.status(201);

    });

router.post('/searchReceiptRecord',
    async (req, res) => {

        const {
            Rep,
            Restaurant,
            SearchType,
        } = req.body;

        let ReceiptRecord;


        switch (SearchType) {
            case 'All':
                try {
                    receiptRecord = await Receipt.find();
                    return res.status(200).json({ receipt: receiptRecord });
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: 'No Records returned for your search' });
                }
                break;
            case 'Rep':
                try {
                    
                    receiptRecord = await Receipt.find({ Rep: Rep });
                    return res.status(200).json({ receipt: receiptRecord })

                } catch (error) {
                    return res.status(500).json({ message: 'No Records returned for your search' });
                }
                break;
                case 'Restaurant':
                    try {
                        receiptRecord = await Receipt.find({Restaurant: Restaurant });
                        return res.status(200).json({ receipt: receiptRecord })
                    } catch (error) {
                        return res.status(500).json({ message: 'No Records returned for your search' });
                    }
                    break;
         
        }

    });


router.get('/:id', async(req,res) => {
        try {
            const receipt = await Receipt.findById(req.params.id);
            if(!receipt) {
                return res.status(404).json({msg:'Record not found'});
            }
            res.json(receipt);
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
        const receipt = await Receipt.findById(req.params.id);
        if(!receipt) {
            return res.status(404).json({msg:'Record not found'});
        }
        await receipt.remove();
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
        const receipt = await Receipt.findById(req.params.id);
        if(!receipt) {
            return res.status(404).json({msg:'Record not found'});
        }

     
        const {
            Rep,
            Restaurant,
            Amount,
            SharedAmount,
            Date,
            Event,
            Doctors,
            Notes,
        } = req.body;

        const updatedReceiptRecord = {
            Rep,
            Restaurant,
            Amount,
            SharedAmount,
            Date,
            Event,
            Doctors,
            Notes,
        }

        Object.assign(receipt,updatedReceiptRecord);
   
        await receipt.save();
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