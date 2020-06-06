const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();
const auth = require('../middleware/auth.middleware');
const config = require('config');
const shortid = require('shortid');

router.get('/:code', async (req, res) => {
    try {
        console.log( req.params )
        const link = await Link.findOne({code: req.params.code})

        if ( link ) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(404).json('Ссылка не найдена')
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так попробуйте снова'})
    }
})

module.exports = router