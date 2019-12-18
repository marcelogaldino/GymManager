// const modalOverlay = document.querySelector(".modal-overlay")
// const cards = document.querySelectorAll(".card")

// for (let card of cards) {
//     card.addEventListener("click", function() {
//         modalOverlay.classList.add("active")
//     })
// }

// document.querySelector(".close-modal").addEventListener("click", function() {
//     modalOverlay.classList.remove("active")
// })

const instructors = document.querySelector("#instructors")
const members = document.querySelector("#members")

// console.log(members)

document.querySelector("#members").addEventListener("click", function() {
    document.querySelector("#members").classList.add("active")
    console.log(members)
})

// members.addEventListener("click", function() {
//     members.classList.add("active")
// })