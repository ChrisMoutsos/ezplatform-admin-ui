(function(global, doc, $, flatpickr, ReactDOM, eZ, Routing, Translator) {
    const SELECTOR_MODAL_RESCHEDULE = '#reschedule-publish-later-modal';
    const modal = doc.querySelector(SELECTOR_MODAL_RESCHEDULE);
    const flatpickrInput = modal.querySelector('.flatpickr-date-input');
    const confirmBtn = modal.querySelector('.ez-btn--confirm-reschedule');
    const cancelBtn = modal.querySelector('.ez-btn--cancel-reschedule');
    let selectedDate = null;
    const updateValue = (dates) => {
        const isSelectedDate = !!dates[0];

        selectedDate = isSelectedDate ? dates[0].getTime() / 1000 : '';
        confirmBtn.disabled = !isSelectedDate;
    };
    const showReschedulePublishLaterModal = () => {
        $(SELECTOR_MODAL_RESCHEDULE).modal('show');
    };
    const handleConfirm = () => {
        console.log('confirm', selectedDate);
    };
    const handleCancel = () => {
        // bootstrap detects cancel on its own i guess
        // $(SELECTOR_MODAL_RESCHEDULE).modal('hide');
        console.log('cancel');
    };
    const handleRescheduleEvents= () => {
        // TODO: implement rescheduling
        console.log('handle reschedule')
    }

    if (!confirmBtn) {
        return;
    }

    flatpickr(flatpickrInput, {
        enableTime: true,
        time_24hr: true,
        formatDate: (date) => new Date(date).toLocaleString(),
        minDate: Date.now(),
        onChange: updateValue,
        inline: true,
    });

    confirmBtn.addEventListener('click', handleConfirm, false);
    cancelBtn.addEventListener('click', handleCancel, false);

    doc.addEventListener('ez-reschedule-events', handleRescheduleEvents, false);
    // showReschedulePublishLaterModal();
})(window, window.document, window.jQuery, window.flatpickr, window.ReactDOM, window.eZ, window.Routing, window.Translator);
