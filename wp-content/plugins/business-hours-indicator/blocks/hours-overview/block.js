(function (wp) {
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, SelectControl } = wp.components;
    const ServerSideRender = wp.serverSideRender;
    const { createElement: el } = wp.element;

    registerBlockType('mbhi/hours-overview', {
        title: '[BHI] opening hours overview',
        icon: 'clock',
        attributes: {
            displayLocation: {
                type: 'string',
                default: ''
            }
        },
        edit: function (props) {
            const { attributes, setAttributes } = props;
            const { displayLocation } = attributes;
            const blockProps = useBlockProps();
            const customOptions = window.mbhiOverviewSettings ? window.mbhiOverviewSettings.locations : [];
            
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
                        })
                    )
                ),
                el(ServerSideRender, {
                    block: 'mbhi/hours-overview',
                    attributes: { displayLocation }
                })
            );
        },
        save: function () {
            return null;
        }
    });
})(window.wp);