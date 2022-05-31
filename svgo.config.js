export default {
	multipass: true,
	plugins: [
		{
			name: 'preset-default'
		},
		{
			name: 'removeAttributesBySelector',
			params: {
				selector: 'svg',
				attributes: ['xml:space', 'id', 'viewBox']
			}
		},
		{
			name: 'removeAttributesBySelector',
			params: {
				selector: 'path',
				attributes: ['fill']
			}
		},
		{
			name: 'addAttributesToSVGElement',
			params: {
				attributes: [
					{
						fill: 'currentColor'
					}
				]
			}
		},
		{
			name: 'sortAttrs'
		},
		{
			name: 'removeAttrs',
			params: {
				attrs: ['data-*', 'data.*']
			}
		},
		{
			name: 'removeDimensions'
		},
		{
			name: 'convertStyleToAttrs',
			params: {
				keepImportant: true
			}
		}
	]
};
