module.exports = function(chromy, scenario) {
	var eventCalendarSelector = '.event-calendar';
    var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
	chromy.evaluate((eventCalendarSelector) => {
                if (jQuery){
                    let _$ = jQuery;
					 _$('.fc-today').removeClass('fc-today');
					 _$('.event-calendar .fc-body .fc-row:nth-child(1) .fc-bg tbody td:first-child').addClass('fc-today');
                }
			},[eventCalendarSelector])
			if (postInteractionWait) {
                chromy.wait(parseInt(postInteractionWait));
            }

};