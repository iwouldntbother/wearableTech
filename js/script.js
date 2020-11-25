document.addEventListener("scroll", function(){
    var image = document.getElementById("productImage")
    var scrollPercent = window.scrollY / document.getElementById("productContainer").scrollHeight
    var imageMarginTop = Math.min(100, Math.max(10, (100 - (scrollPercent * 90))))

    image.style.marginTop = String(imageMarginTop) + "vh"

    console.log(scrollPercent)
    // console.log((100 - (scrollPercent * 90)))
    // console.log(Math.min(100, Math.max(10, (100 - (scrollPercent * 90)))))

})