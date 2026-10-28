document.addEventListener("DOMContentLoaded", function () {

    var cart = [];

    var addButtons = document.querySelectorAll(".add-btn");
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", function () {
            var title = this.getAttribute("data-title");
            var price = parseInt(this.getAttribute("data-price"));
            cart.push({ title: title, price: price });
            updateCart();
            alert("«" + title + "» добавлен в корзину!");
        });
    }

    var selects = ["roses", "tulips", "daisies", "packaging", "card"];
    for (var j = 0; j < selects.length; j++) {
        document.getElementById(selects[j]).addEventListener("change", calculateTotal);
    }

    function calculateTotal() {
        var roses = parseInt(document.getElementById("roses").value) || 0;
        var tulips = parseInt(document.getElementById("tulips").value) || 0;
        var daisies = parseInt(document.getElementById("daisies").value) || 0;
        var packaging = parseInt(document.getElementById("packaging").value) || 0;
        var card = parseInt(document.getElementById("card").value) || 0;
        var total = roses * 150 + tulips * 80 + daisies * 60 + packaging + card;
        document.getElementById("totalPrice").textContent = "Итого: " + total + " ₽";
        return total;
    }

    document.getElementById("builderAddBtn").addEventListener("click", function () {
        var total = calculateTotal();
        if (total === 0) { alert("Сначала выберите цветы!"); return; }
        cart.push({ title: "Свой букет (конструктор)", price: total });
        updateCart();
        alert("Букет добавлен! Стоимость: " + total + " ₽");
    });

    function updateCart() {
        var cartItems = document.getElementById("cartItems");
        document.getElementById("cartCount").textContent = cart.length;

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Корзина пока пуста</p>";
            document.getElementById("clearCartBtn").style.display = "none";
            document.getElementById("flowersTotal").textContent = "0 ₽";
            document.getElementById("deliveryTotal").textContent = "0 ₽";
            document.getElementById("grandTotal").textContent = "0 ₽";
            return;
        }

        var html = "";
        var flowersTotal = 0;
        for (var i = 0; i < cart.length; i++) {
            html += "<div class='cart-item'><span>" + cart[i].title + " — " + cart[i].price + " ₽</span>" +
                    "<button class='remove-btn' data-index='" + i + "'>Удалить</button></div>";
            flowersTotal += cart[i].price;
        }
        cartItems.innerHTML = html;
        document.getElementById("clearCartBtn").style.display = "inline-block";

        var delivery = parseInt(document.getElementById("deliveryType").value) || 0;
        document.getElementById("flowersTotal").textContent = flowersTotal + " ₽";
        document.getElementById("deliveryTotal").textContent = delivery + " ₽";
        document.getElementById("grandTotal").textContent = (flowersTotal + delivery) + " ₽";

        var removeButtons = document.querySelectorAll(".remove-btn");
        for (var k = 0; k < removeButtons.length; k++) {
            removeButtons[k].addEventListener("click", function () {
                var index = parseInt(this.getAttribute("data-index"));
                cart.splice(index, 1);
                updateCart();
            });
        }
    }

    document.getElementById("deliveryType").addEventListener("change", updateCart);

    document.getElementById("clearCartBtn").addEventListener("click", function () {
        if (confirm("Очистить корзину?")) { cart = []; updateCart(); }
    });

    document.getElementById("orderForm").addEventListener("submit", function (e) {
        e.preventDefault();
        if (cart.length === 0) { alert("Сначала добавьте букет в корзину!"); return; }
        var name = document.getElementById("name").value;
        var delivery = parseInt(document.getElementById("deliveryType").value) || 0;
        var flowersTotal = 0;
        for (var i = 0; i < cart.length; i++) flowersTotal += cart[i].price;
        document.getElementById("orderResult").textContent =
            "Спасибо, " + name + "! Заказ на " + (flowersTotal + delivery) + " ₽ принят.";
        cart = [];
        updateCart();
        this.reset();
    });

    function checkFadeIn() {
        var els = document.querySelectorAll(".fade-in");
        for (var i = 0; i < els.length; i++) {
            if (els[i].getBoundingClientRect().top < window.innerHeight - 50) {
                els[i].classList.add("visible");
            }
        }
    }
    window.addEventListener("scroll", checkFadeIn);
    checkFadeIn();

    var anchorLinks = document.querySelectorAll('nav a[href^="#"]');
    for (var a = 0; a < anchorLinks.length; a++) {
        anchorLinks[a].addEventListener("click", function (e) {
            e.preventDefault();
            var targetId = this.getAttribute("href");
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    calculateTotal();
    updateCart();
});