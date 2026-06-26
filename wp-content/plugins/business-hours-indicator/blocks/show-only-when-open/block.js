(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, SelectControl, TextareaControl } = wp.components;
    const ServerSideRender = wp.serverSideRender;
    const { createElement: el } = wp.element;

    registerBlockType('mbhi/show-only-when-open', {
        title: '[BHI] Show only when open',
        icon: 'clock',
        attributes: {
            displayLocation: {
                type: 'string',
                default: ''
            },
            content: {
                type: 'string',
                default: ''
            }
        },
        edit: function (props) {
            const { attributes, setAttributes } = props;
            const { displayLocation, content } = attributes;
            const blockProps = useBlockProps();
            const customOptions = window.mbhiIfopenSettings ? window.mbhiIfopenSettings.locations : [];
            
            return el(
                'div',
                blockProps,
                el(InspectorControls, {},
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Select Location',
                            value: displayLocation,
                            options: customOptions,
                            onChange: (value) => setAttributes({ displayLocation: value })
                        }),
                        el(TextareaControl, {
                            label: 'Content (shown if open)',
                            value: content,
                            onChange: (value) => setAttributes({ content: value }),
                            placeholder: 'Enter the content that should be shown when open...'
                        })
                    )
                ),
                !content && el('div', { style: { padding: '1em', color: '#999' } }, '[Preview] No content set yet.'),
                el(ServerSideRender, {
                    block: 'mbhi/show-only-when-open',
                    attributes: { displayLocation, content }
                })
            );
        },
        save: function () {
            return null;
        }
    });
})(window.wp);