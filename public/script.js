const currentPage = location.pathname
const links = document.querySelectorAll("header .links a")

for (let link of links) {
    if (currentPage.includes(link.getAttribute("href"))){
        link.classList.add("active")
    }
} 


let totalPages = 20,
    selectedPage = 18,
    pages = [],
    oldPage

for (let pageCurrent = 1; pageCurrent <= totalPages; pageCurrent++) {

    const firstAndLastPage = pageCurrent == 1 || pageCurrent == totalPages
    const pagesAfterSelectedPage = pageCurrent <= selectedPage + 2
    const pagesBeforeSelectedPage = pageCurrent >= selectedPage - 2

    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
        if (oldPage && pageCurrent - oldPage > 2) {
            pages.push('...')
        }

        if (oldPage && pageCurrent - oldPage == 2) {
            pages.push(oldPage + 1)
        }
        pages.push(pageCurrent)

        oldPage = pageCurrent
    }
}

console.log(pages)