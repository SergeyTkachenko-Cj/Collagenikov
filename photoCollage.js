
window.onload = collage('.frame');

function collage(frames) { 

    const callForEachFrame = (event) => {
          const item = event.target.closest(frames);

          serverCall()
            .then(data => {
              if (!data.source_id) setRandomPicture(data.url, item); // no videos condition
              else { callForEachFrame(event); }
            })
            .catch(e => console.log('Ooops! Something went wrong.'));
    }

    const serverCall = () => {
      return fetch("https://cors-anywhere.herokuapp.com/http://www.splashbase.co/api/v1/images/random")
      .then(resp => resp.json());
    }

    const setRandomPicture = (url, btn) => {
      btn.style.cssText += `background: url(${url}); background-size: cover; background-color: #2f8396;`;
    }

    const btnAnim = (event) => {
      const classes = ['js_circle2_anim', 'js_circle3_anim'];
      const item = event.target.closest('.frame');
      const circles = item.querySelectorAll('.js_anima');

      circles.forEach((elem, index) => { 
        if (elem.classList.contains(classes[index])) {
          elem.classList.remove(classes[index]);
        }
        else {
          elem.classList.add(classes[index]);
        }
      });
    }

    const iterateFrames = (allFrames) => {

        const event = (el, ev) => {
          el.addEventListener(ev, trgt => {
            callForEachFrame(trgt);
            btnAnim(trgt);
          })
        }

        allFrames.forEach(elem => { 
          event(elem, 'click');
          event(elem, 'touchstart');
          elem.click();
        });
    };

    const inputValid = ((classname) => {
      const errMsg = 'Wrong input (class name expected - ".classname")';
        try { 
          const cls = document.querySelectorAll(classname);
          if (cls.length > 0) iterateFrames(cls);
          else { console.log(errMsg); }
        } catch(e) { console.log(e) }
    })(frames);
}