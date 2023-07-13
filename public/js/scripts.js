(function($){

	$(window).on('load', function(){
		$('.fade-in').css({ position: 'relative', opacity: 0, top: -14 });
		setTimeout(function(){
			$('#preload-content').fadeOut(400, function(){
				$('#preload').fadeOut(800);
				setTimeout(function(){
					$('.fade-in').each(function(index) {
						$(this).delay(400*index).animate({ top : 0, opacity: 1 }, 800);
					});
				}, 800);
			});
		}, 400);
	});

	$(document).ready( function(){

		// Create a countdown instance. Change the launchDay according to your needs.
		// The month ranges from 0 to 11. I specify the month from 1 to 12 and manually subtract the 1.
		// Thus the launchDay below denotes 7 October, 2017.
		var launchDay = new Date(2017, 10-1, 7);
		$('#timer').countdown({
			until: launchDay
		});

		// Add YouTube video background
		var bgVideo = $('#bg-video');
		if ( !device.tablet() && !device.mobile() ) {
			bgVideo.YTPlayer();
			$('#bg-video-volume').click(function(e){
				var bgVideoVol = $(this);
				e.preventDefault();
				if( bgVideoVol.hasClass('fa-mute') ) {
					bgVideoVol.removeClass('fa-mute').addClass('fa-sound').attr('title', 'Mute');
					bgVideo.YTPUnmute();
				} else {
					bgVideoVol.removeClass('fa-sound').addClass('fa-mute').attr('title', 'Unmute');
					bgVideo.YTPMute();
				}
			});
			$('#bg-video-play').click(function(e){
				var bgVideoPlay= $(this);
				e.preventDefault();
				if( bgVideoPlay.hasClass('fa-pause') ) {
					bgVideoPlay.removeClass('fa-pause').addClass('fa-play').attr('title', 'Play');
					bgVideo.YTPPause();
				} else {
					bgVideoPlay.removeClass('fa-play').addClass('fa-pause').attr('title', 'Pause');
					bgVideo.YTPPlay();
				}
			});
		} else {
			var posterUrl = bgVideo.data('poster');
			if ( posterUrl )
				$.backstretch(posterUrl);
			$('#bg-video-controls').hide();
		}

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate subscribe form
		$('<div class="loading"><span class="bounce1"></span><span class="bounce2"></span><span class="bounce3"></span></div>').hide().appendTo('.form-wrap');
		$('<div class="success"></div>').hide().appendTo('.form-wrap');
		$('#subscribe-form').validate({
			rules: {
				subscribe_email: { required: true, email: true }
			},
			messages: {
				subscribe_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('#subscribe .loading').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('#subscribe .loading').animate({opacity: 0}, function(){
						$(this).hide();
						$('#subscribe .success').show().html('<p>Thank you for subscribing!</p>').animate({opacity: 1});
					});
				});
				return false;
			}
		});

		// Open modal window on click
		$('#modal-open').on('click', function(e) {
			var mainInner = $('#main .inner'),
				modal = $('#modal');

			mainInner.animate({ opacity: 0 }, 400, function(){
				$('html,body').scrollTop(0);
				modal.addClass('modal-active').fadeIn(400);
			});
			e.preventDefault();

			$('#modal-close').on('click', function(e) {
				modal.removeClass('modal-active').fadeOut(400, function(){
					mainInner.animate({ opacity: 1 }, 400);
				});
				e.preventDefault();
			});
		});

	});
	
})(jQuery);