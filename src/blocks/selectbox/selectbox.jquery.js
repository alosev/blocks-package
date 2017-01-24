(function($){
	jQuery.fn.selectbox = function(){

		var make = function(){
	    	if( $(this).prop('tagName').toLowerCase() !== 'select' ){
	    		return false;
	    	}

	    	var continerTag = 'div';
	    	var selectbox = $('<' + continerTag + '/>', {class: 'selectbox'});
	    	$(this).addClass('selectbox__select');
	    	$(this).wrap(selectbox);

	    	var selectboxElement = $('<div/>', {class: 'selectbox__element'});

	    	selectboxElement.on('click', function(e){
				e.preventDefault();

				$(this).find('.selectbox__list').eq(0).slideToggle(300);
			});

	    	var selectboxLabel = $('<span/>', {class: 'selectbox__label'});
	    	var selectboxList = $('<ul/>', {class: 'selectbox__list'});

	    	$($(this).prop('options')).each( function(){
	    		var text = $(this).html();
	    		var val = $(this).prop('value');
	    		var selected = $(this).prop('selected');

	    		var selectboxItem = $('<li/>', {class: 'selectbox__item'});
	    		var selectboxLink = $('<span/>', {class: 'selectbox__link' + ((selected)?' selectbox__link_selected':''), rel: val}).html(text);

	    		selectboxLink.on('click', function(e){
					e.preventDefault();
					//e.stopPropagation();

					var rel = $(this).attr('rel');
					var val = $(this).html();
					var sb = $(this).parents('.selectbox');
					
					sb.find('.selectbox__link').removeClass('selectbox__link_selected');
					$(this).addClass('selectbox__link_selected');
					sb.data('rel', rel);
					sb.find('.selectbox__label').eq(0).html(val).attr('title', val);
					sb.find('.selectbox__select').val(rel);
				});

	    		selectboxItem.append(selectboxLink);
	    		selectboxList.append(selectboxItem);

	    		if(selected){
	    			selectboxLabel.html(text);
	    			selectboxLabel.attr('title', text);
	    			selectbox.data('rel', val);
	    		}
	    	});

	    	selectboxElement.append(selectboxLabel);
	    	selectboxElement.append(selectboxList);

	    	$(this).after(selectboxElement);

	    };

 		return this.each(make); 
	};
})(jQuery);
