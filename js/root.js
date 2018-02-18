var inputSource = document.getElementById('input-source');
var outputSource = document.getElementById('output-source');

function init()
{
	console.log("running init");

	function randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	setInterval(function () {
		if(randomRange(0, 1) == 0)
		{
			glitcher.glitch(inputSource, outputSource, null);
			return;
		}

		glitcher.glitch
		(
			inputSource,
			outputSource,
			{
				color: {
					red: 0.8,
					green: 0.9,
					blue: 0.58
				},
				stereoscopic: {
					red: 10 * randomRange(1, 3),
					green: 5 * randomRange(1, 3),
					blue: 30 * randomRange(1, 3)
				},
				lineOffset: {
					value: 5 * randomRange(1, 5),
					lineHeight: 5 * randomRange(1, 10)
				}
			}
		);
	}, 100);

}


inputSource.addEventListener('loadeddata', init, false)