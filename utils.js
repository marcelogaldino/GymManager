module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let year = today.getFullYear() - birthDate.getFullYear(birthDate)

        const month = today.getMonth() - birthDate.getMonth(birthDate)
        
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate(birthDate)) {
            year = year - 1
        }
        
        return year
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return(`${year}-${month}-${day}`)

    }
}