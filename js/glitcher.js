var glitcher = (function() 
{
	function glitchImage(imageData, width, height, options) 
	{
		let pixels = imageData.data;
		let length = pixels.length;
		let brightness;
		let offset;
		let i, x, y;

		for (i = 0; i < length; i += 4) {
			if (options.color) {
				pixels[i] *= options.color.red;
				pixels[i + 1] *= options.color.green;
				pixels[i + 2] *= options.color.blue;
			}

			if (options.greyscale) {
				brightness = pixels[i] * options.greyscale.red + pixels[i + 1] * options.greyscale.green + pixels[i + 2] * options.greyscale.blue;

				pixels[i] = brightness;
				pixels[i + 1] = brightness;
				pixels[i + 2] = brightness;
			}

			if (options.stereoscopic) {
				offset = options.stereoscopic.red;
				pixels[i] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];

				offset = options.stereoscopic.green;
				pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];

				offset = options.stereoscopic.blue;
				pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
			}
		}

		if (options.lineOffset) {
			i = 0;

			for (y = 0; y < height; y++) {
				offset = (y % options.lineOffset.lineHeight === 0) ? Math.round(Math.random() * options.lineOffset.value) : offset;

				for (x = 0; x < width; x++) {
					i += 4;
					pixels[i + 0] = (pixels[i + 4 * offset] === undefined) ? 0 : pixels[i + 4 * offset];
					pixels[i + 1] = (pixels[i + 1 + 4 * offset] === undefined) ? 0 : pixels[i + 1 + 4 * offset];
					pixels[i + 2] = (pixels[i + 2 + 4 * offset] === undefined) ? 0 : pixels[i + 2 + 4 * offset];
				}
			}
		}

		return imageData;
	};

	return {
		glitch: function(video, canvas, options)
		{
			let context = canvas.getContext('2d');

			context.drawImage(video, 0, 0, video.width, video.height);
			let imageData = context.getImageData(0, 0, video.width, video.height);
			if(options !== null)
			{
				imageData = glitchImage(imageData, video.width, video.height, options);
			}
			context.putImageData(imageData, 0, 0);
		}
	}
})();