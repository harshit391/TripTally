const eleFunc = () =>
{
    const ttl = document.querySelector(".title");
    const ttl1 = document.querySelector(".title1");
    const ttl2 = document.querySelector(".title2");

    const track = document.querySelector(".tracking");

    track.addEventListener("click", () => {
        track.classList.toggle("selected");
        track.innerText =  track.classList.contains("selected") ? "Stop Tracking" : "Start Tracking";
    });

    const listcoming = document.querySelectorAll(".form-container")[1];
    const listgoing = document.querySelectorAll(".form-container")[0];

    const defaultlist = localStorage.getItem('defaultlist');
    
    if(defaultlist === "coming")
    {
        ttl2.classList.add("selected");
        listcoming.style.display = "flex";
        listgoing.style.display = "none";
        ttl.innerText = "List Coming from Trip";
    }

    else
    {
        ttl1.classList.add("selected");
        listcoming.style.display = "none";
        listgoing.style.display = "flex";
        ttl.innerText = "List Going on Trip";
    }

    ttl1.addEventListener('click', () =>
    {
        ttl1.classList.add("selected");
        listcoming.style.display = "none";
        listgoing.style.display = "flex";
        ttl2.classList.remove("selected");
        ttl.innerText = "List Going on Trip";
        localStorage.setItem('defaultlist', 'going');
    });

    ttl2.addEventListener('click', () =>
    {
        ttl2.classList.add("selected");
        listcoming.style.display = "flex";
        listgoing.style.display = "none";
        ttl1.classList.remove("selected");
        ttl.innerText = "List Coming from Trip";
        localStorage.setItem('defaultlist', 'coming');
    });
}

