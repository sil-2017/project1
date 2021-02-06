$(function () {

   $('.make3D').hover(function () {
       $(this).addClass('animate');
       $(this).parent().css('z-index', "20");
   }, function () {
       $(this).removeClass('animate');
   });
    var bag = [];

    $('.add_to_cart').click(function () {
        var productCard = $(this).parent();
        var position = productCard.offset();

        var productImage = $(productCard).find('img').get(0).src;
        var productName = $(productCard).find('.product_name').get(0).innerHTML;

        $("body").append('<div class="floating-cart"></div>');
        var cart = $('div.floating-cart');
        productCard.clone().appendTo(cart);
        $(cart).css({
            'top': position.top + 'px',
            'left': position.left + 'px'
        }).fadeIn("slow").addClass('moveToCart');

        setTimeout(function () {
            $("body").addClass("MakeFloatingCart");
        }, 100);

        setTimeout(function () {
            $('div.floating-cart').remove();
            $("body").removeClass("MakeFloatingCart");

            var price = $(productCard).find('.product_price').html();

            var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='" + productImage + "' alt=''/></div><span>" + productName + "</span><strong>" + price + "</strong><div class='cart-item-border'></div><div class='delete-item'>X</div></div>";

            var price2 = parseFloat(productCard.find('.product_price').data('price'));

            bag.push(price2);
            var sum = 0;

            $(".total").text(function () {
                for (var i = 0; i <= bag.length - 1; i++) {
                    sum += bag[i];
                }
                var last = "$ " + sum.toFixed(2);
                $('.pay-last').text(last);
                return last; // return total only -> bug.
            });

            $("#cart .empty").hide();
            $("#cart").append(cartItem);
            $("#checkout").fadeIn(1000);

            //close
            $("#cart .cart-item").last().addClass("flash").find(".delete-item").click(function () {
                var summ = 0;

                $(this).parent().fadeOut(300, function () {
                    

                    $(".total").text(function () {
                        var index = bag.indexOf(price2);
                        if (index > -1) {
                            bag.splice(index, 1);
                        }
                        
                        for (var i = 0; i <= bag.length - 1; i++) {
                            summ -= bag[i];
                        }
                        var las = "$ " + Math.abs(summ).toFixed(2);
                        $('.pay-last').text(las);

                        return las; // return total only -> bug.
                    });

                    if ($("#cart .cart-item").size() == 0) {
                        $("#cart .empty").fadeIn(500);
                        $("#checkout").fadeOut(500);
                    }
                })
            });
            setTimeout(function () {
                $("#cart .cart-item").last().removeClass("flash");
            }, 10);
        }, 500);
    });

   $('.view_gallery').click(function () {
       $('#exampleModal').addClass('animated zoomIn');

       var myimg = $(this).find('img').clone();

       $('#exampleModal .modal-body').find('.galery').empty().append(myimg);

   });


   //    timer
   
   function showClock() {
       var now = new Date(),
           hours = now.getHours(),
           minutes = now.getMinutes(),
           seconds = now.getSeconds();

       if (hours < "10") {
           hours = "0" + hours;
       }
       if (minutes < "10") {
           minutes = "0" + minutes;
       }
       if (seconds < "10") {
           seconds = "0" + seconds;
       }

       $('.timer .hours').html(hours + ' :');
       $('.timer .minutes').html(minutes + ' :');
       $('.timer .seconds').html(seconds);
   }
   showClock();
   setInterval(function () {
       showClock();
   }, 1000);

});
