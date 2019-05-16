(function(global, doc, $, React, ReactDOM, eZ, Routing, Translator) {
    const SELECTOR_MODAL_DISCARD = '#discard-publish-later-modal';
    const setModalTableTitle = (title) => {
        const modalTableTitleNode = doc.querySelector(`${SELECTOR_MODAL_DISCARD} .ez-table-header__headline`);

        modalTableTitleNode.innerHTML = title;
    };
    const setModalTableBody = (events) => {
        const modal = doc.querySelector(SELECTOR_MODAL_DISCARD);
        const table = modal.querySelector('.ez-bulk-action-failed-modal__table');
        const tableBody = table.querySelector('.ez-bulk-action-failed-modal__table-body');
        const tableRowTemplate = table.dataset.tableRowTemplate;
        const fragment = doc.createDocumentFragment();

        events.forEach((event) => {
            const { contentTypeIdentifier, contentName, language } = event.data;
            const container = doc.createElement('tbody');
            const renderedItem = tableRowTemplate
                .replace('{{ content_type_identifier }}', contentTypeIdentifier)
                .replace('{{ content_name }}', contentName)
                .replace('{{ event_name }}', event.title)
                .replace('{{ language }}', language);

            container.insertAdjacentHTML('beforeend', renderedItem);

            const tableRowNode = container.querySelector('tr');

            fragment.append(tableRowNode);
        });

        removeNodeChildren(tableBody);
        tableBody.append(fragment);
    };
    const removeNodeChildren = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };
    let events = null;
    const showDiscardPublishLaterModal = () => {
        const tableTitle = `Selected content (${events.length})`;

        setModalTableBody(events);
        setModalTableTitle(tableTitle);

        $(SELECTOR_MODAL_DISCARD).modal('show');
    };

    events = [
        {
            title: 'Content publish',
            data: {
                contentTypeIdentifier: 'article',
                contentName: 'Polish Cuisine',
                language: 'English (United Kingdom)',
            },
        },
        {
            title: 'Content publish',
            data: {
                contentTypeIdentifier: 'article',
                contentName: 'Irish Cuisine',
                language: 'English (United Kingdom)',
            },
        },
        {
            title: 'Content publish',
            data: {
                contentTypeIdentifier: 'article',
                contentName: 'Moroccan Cuisine',
                language: 'English (United Kingdom)',
            },
        },
    ];

    showDiscardPublishLaterModal();
    // TODO:
    // confirmBtn.addEventListener('click', handleConfirm, false);
    // cancelBtn.addEventListener('click', handleCancel, false);
})(window, window.document, window.jQuery, window.React, window.ReactDOM, window.eZ, window.Routing, window.Translator);
