var AudioAnalyser = (function() 
{
	var audio = new (window.AudioContext || window.webkitAudioContext)();
	var analyser = audio.createAnalyser();
	analyser.fftSize = 128;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	function init(audioSource)
	{
		var source = audio.createMediaElementSource(audioSource);
		source.connect(analyser);
		analyser.connect(audio.destination);
	}

	function getLastFrequency(scale)
	{
		analyzer.getByteFrequencyData(dataArray);
		return dataArray[0];
	}

	return {
		init: init,
		getLastFrequency: getLastFrequency
	};

})();
