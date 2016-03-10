document.querySelector('#grid').addEventListener('click', function(e) {
    if(e.target.tagName === 'IMG') {
        var thumbnail = e.target;
        var lowRes = thumbnail.src;

        // create overlay

        var overlay = document.createElement('div');
        overlay.style.backgroundColor = "rgba(0,0,0,0.7)";
        overlay.style.left = window.pageXOffset + 'px';
        overlay.style.top = window.pageYOffset + 'px';
        overlay.style.height = window.innerHeight + 'px';
        overlay.style.width = window.innerWidth + 'px';
        overlay.style.position = "absolute";
        overlay.style.cursor = "pointer"
        document.body.appendChild(overlay);

        var preview = document.createElement('IMG');
        preview.src = lowRes.substring(0, lowRes.length - 7) + '.jpg';

        preview.addEventListener('load', function load() {

            //resize pic
            if(this.height > window.innerHeight) {
                var ratio = window.innerHeight / this.height * 0.8;
                this.height *= ratio;
                this.width *= ratio ;
            }
            if(this.width > window.innerWidth) {
                var ratio = window.innerWidth / this.width * 0.8;
                this.width *= ratio;
                this.height *= ratio;
            }

            // center pic
            this.style.position = "absolute";
            this.style.left = (window.innerWidth - this.width) / 2 + 'px';
            this.style.top = (window.innerHeight - this.height) / 2 + 'px';

             overlay.appendChild(preview);

             overlay.addEventListener('click', function remove() {
                this.removeEventListener('click', remove, false);
                preview.removeEventListener('load', load, false);
                document.body.removeChild(overlay);
                window.removeEventListener('scroll', scroll, false)
                window.removeEventListener('resize', resize, false)

             }, false)

             window.addEventListener('scroll', function scroll() {
                if(overlay) {
                    overlay.style.top = window.pageYOffset + 'px';
                    overlay.style.left = window.pageXOffset + 'px';
                }
             }, false)

             window.addEventListener('resize', function resize() {
                if(overlay) {
                    overlay.style.width = window.innerWidth + 'px';
                    overlay.style.height = window.innerHeight + 'px';
                    preview.style.left = (window.innerWidth - preview.width) / 2 + 'px';
                    preview.style.top = (window.innerHeight - preview.height) / 2 + 'px';
                }
             }, false)
        }, false)
        


    };
}, false)