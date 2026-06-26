(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, SelectControl, TextareaControl } = wp.components;
    const ServerSideRender = wp.serverSideRender;
    const { createElement: el } = wp.element;

    registerBlockType('mbhi/show-only-when-closed', {
        title: '[BHI] Show only when closed',
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
            const customOptions = window.mbhiIfclosedSettings ? window.mbhiIfclosedSettings.locations : [];
            
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
                            label: 'Content (shown if closed)',
                            value: content,
                            onChange: (value) => setAttributes({ content: value }),
                            placeholder: 'Enter the content that should be shown when closed.'
                        })
                    )
                ),
                !content && el('div', { style: { padding: '1em', color: '#999' } }, '[Preview] No content set yet.'),
                el(ServerSideRender, {
                    block: 'mbhi/show-only-when-closed',
                    attributes: { displayLocation, content }
                })
            );
        },
        save: function () {
            return null;
        }
    });
})(window.wp);