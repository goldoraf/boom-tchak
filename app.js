function loadSoundFile(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.addEventListener("error", reject);
        xhr.addEventListener("load", function(e) {
            resolve(e.target.response);
        });
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
    });
}

function decodeSoundFile(arrayBuffer) {
    return new Promise(function(resolve, reject) {
        context.decodeAudioData(arrayBuffer, function(buffer) {
            resolve(buffer);
        }, function(e) {
            reject(e);
        }); 
    });
}

function playSound(soundName) {
    var source = context.createBufferSource();
    source.buffer = buffers[soundName];
    source.loop = false;
    source.connect(context.destination);
    source.noteOn(0);
}


var context = new window.webkitAudioContext(),
    sounds = ['kick_Dry_b', 'clap_Dry_c'],
    buffers = {};

sounds.forEach(function(name) {
    loadSoundFile('sounds/'+name+'.wav')
        .then(decodeSoundFile)
        .then(function(buffer) {
            buffers[name] = buffer;
            var btn = document.createElement('button');
            btn.textContent = name;
            document.body.appendChild(btn);
            btn.addEventListener('click', function(e) {
                playSound(e.target.textContent);
            }, false);
            console.log(buffers);
        });
});
