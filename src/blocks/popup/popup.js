$(document).ready(function() {
	// Попапы
    /* попапы ищем по атрибуту. В нем прописан сам попап, который нужно открыть*/
    $('[data-popup]').each(function(id,el){
        $(this).click('click', function(e){
            popupOpen(e);
        });
    });
    /* Вешаем закрытие попапа, если щелкнули вне окна*/
    $('.popup-block').on('click',function(e){
		popupClose(e);
	});
    /* закрываем попап по щелчку на закрыть*/
    $('.popup__close').on('click', function(e){
        popupClose(e);
    });
    /* для переключения попапов в пределах одной обертки popup-block*/
    /* callback-popup - название нового попапа */
    // popupSwitch('callback-popup');
    // возвращет true - если переключение удалось, и false - если нет окна, старое закрываться не будет
    $('[data-popup-switch]').each(function(id,el){
    	var popup = $(this).attr('data-popup-switch');

        $(this).click('click', function(e){
        	if(!popupSwitch(popup)){
        		console.log('popup not switch');
        	}
        });

    });
    
});

function popupOpen(e){
    e.preventDefault();
    
    var el = $(e.target);
    var popup = el.attr('data-popup');
    
    $("body").addClass("lock");
	$(".popup-block").fadeIn("normal",function(){
		$(".popup-block ." + popup).fadeIn("normal");
	});
}
function popupClose(e){
    e.preventDefault();
    
    e = e || null;
	if( (e == null) || $(e.target).is(".popup-block") || $(e.target).is(".popup__close") ){
		$(".popup-block .popup").fadeOut("normal",function(){
			$(".popup-block").fadeOut("normal",function(){
				$("body").removeClass("lock");
			});
		});
	}   
}
function popupSwitch(name){
    var popup = $('.' + name);
    if(popup.length > 0){
        $(".popup-block .popup").fadeOut("normal",function(){
			$(".popup-block ." + name).fadeIn("normal");
		});
        
        return true;
    }
    
    return false;
}