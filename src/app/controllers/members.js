const { age, date } = require('../../lib/utils')

const Member = require('../models/Member')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 4
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members) {
                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }

                return res.render('members/index', { members, pagination, filter })
            }
        }

        Member.paginate(params)
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] === "") {
                return res.send('Please, fill all the fields')
            }
        }

        Member.create(req.body, member => {
            return res.redirect(`members/${member.id}`)
        })
    },

    put(req, res) {
        const keys = Object.keys(req.body)
        
        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!!")
            }
        }

        Member.update(req.body, () => {
            return res.redirect(`members/${req.body.id}`)
        })
    },

    delete(req, res) {
        Member.delete(req.body.id, () => {
            return res.redirect(`members`)
        })
    },

    create(req, res) {
        Member.instructorSelectOptions(options => {
            return res.render('members/create', { options })
        })
    },

    show(req, res) {
        Member.find(req.params.id, member => {
            if(!member) return res.send('Member not found!')

            member.birth = date(member.birth).birthDay

            return res.render('members/show', { member })
        })
    },

    edit(req, res) {
        Member.find(req.params.id, member => {
            if(!member) return res.send('Member not found!')

            member.birth = date(member.birth).iso

            Member.instructorSelectOptions(options => {
                return res.render('members/edit', { member, options })
            })
        })
    }
}