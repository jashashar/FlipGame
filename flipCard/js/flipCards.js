(function () {
  var card = document.querySelectorAll(".card");
  var isFlipped = false;
  var firstCard;
  var secondCard;
  var successArray = [];

  document.addEventListener("DOMContentLoaded", function () {
    ClickedData();
    shuffle();
  });

  function ClickedData() {
    card.forEach(function (currElem) {
      currElem.addEventListener("click", flip);
    });
  }

  function flip() {
    this.firstChild.nextSibling.classList.remove("front");
    if (!isFlipped) {
      firstCard = this;
      isFlipped = true;
    } else {
      secondCard = this;

      if (
        firstCard.firstChild.nextSibling.dataset.card ==
        secondCard.firstChild.nextSibling.dataset.card
      ) {
        success();
      } else {
        fail();
      }
    }

    if (card.length == successArray.length) {
      win();
    }
  }

  function success() {
    firstCard.removeEventListener("click", flip);
    successArray.push(firstCard);
    secondCard.removeEventListener("click", flip);
    successArray.push(secondCard);
    reset();
  }

  function fail() {
    setTimeout(function () {
      firstCard.firstChild.nextSibling.classList.add("front");
      secondCard.firstChild.nextSibling.classList.add("front");
      reset();
    }, 300);
  }

  function shuffle() {
    card.forEach(function (currElem) {
      var index = Math.floor(Math.random() * card.length - 1);
      currElem.setAttribute("style", `order : ${index}`);
    });
  }

  function reset() {
    isFlipped = false;
    firstCard = null;
    secondCard = null;
  }

  function win() {
    document.getElementById("won").classList.add("won");
    document.getElementById("cards").innerHTML = "";
    document.getElementById("cards-title").innerHTML = "";
  }
})();
