const template = document.createElement('template');
template.innerHTML = `
<style>
    .timeline-container {
        display: grid;
        grid-template-columns: 200px 90px 0px 100px 200px;
        align-items: center;
        min-height: 50px;
    }

    .text-container {
        padding: 10px;
        color: var(--color-text);

    }

    .text-container img {
        max-width: 180px;
    }

    .text-container-left {
        text-align: end;
    }

    .year-container {
        text-align: center;
        font-weight: bold;
        font-size: 25px;
        color: var(--color-year);
    }

    .border-top {
        border-top: 7px solid var(--color-line);
    }

    .border-bottom {
        border-bottom: 7px solid var(--color-line);
    }

    .middle-line {
        border-right: 10px solid var(--color-line);
        height: 100%
    }

    .timeline-container:first-of-type .middle-line {
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
    }

    .timeline-container:last-of-type .middle-line {
        border-bottom-right-radius: 50px;
        border-bottom-left-radius: 50px;
    }
</style>
`

class TimeLine extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.yearStart = parseInt(this.getAttribute('year-start') || 2000);
        this.yearEnd = parseInt(this.getAttribute('year-end') || 2020);
        this.steps = parseInt(this.getAttribute('steps') || 2);
        this.createElements();

        this.shadowRoot.host.style.setProperty('--color-line', this.getAttribute('color-line') || 'black');
        this.shadowRoot.host.style.setProperty('--color-text', this.getAttribute('color-text') || 'black');
        this.shadowRoot.host.style.setProperty('--color-year', this.getAttribute('color-year') || 'black');
    }

    createElements() {
        const amountOfYears = this.yearEnd - this.yearStart;
        for (let i = 0; i < amountOfYears + 1; i++) {
            this.createSingleTimelineContainer(this.yearStart + i)
            i += this.steps - 1;
        }

        if (this.yearEnd % this.steps != 0) {
            this.createSingleTimelineContainer(this.yearEnd);
        }
    }

    createSingleTimelineContainer(year) {

        const timelineContainers = document.createElement('div');
        timelineContainers.classList.add('timeline-container');

        const containerLeftText = document.createElement('div');
        containerLeftText.classList.add('text-container', 'text-container-left');

        const containerLeftLine = document.createElement('div');
        containerLeftLine.classList.add('line-container');

        const middleLine = document.createElement('div');
        middleLine.classList.add('middle-line');

    

        const containerRightYear = document.createElement('div');
        containerRightYear.classList.add('year-container');
        containerRightYear.textContent = year;


        const containerRightText = document.createElement('div');
        containerRightText.classList.add('text-container');

        const innerHtmlElement = this.querySelectorAll(`[year="${year}"]`);


        if (innerHtmlElement) {
            innerHtmlElement.forEach((element) => {
                const definedPosition = element.getAttribute('position');
                if (definedPosition == 'left') {
                    containerLeftText.innerHTML = element.innerHTML;
                    containerLeftLine.classList.add('border-top')
                }
                if (definedPosition == 'right') {
                    containerRightText.innerHTML = element.innerHTML;
                    containerRightYear.classList.add('border-bottom')
                }
            });
        }

        timelineContainers.appendChild(containerLeftText);
        timelineContainers.appendChild(containerLeftLine);
        timelineContainers.appendChild(middleLine);
        timelineContainers.appendChild(containerRightYear);
        timelineContainers.appendChild(containerRightText);

        this.shadowRoot.appendChild(timelineContainers);
    }
}

window.customElements.define('time-line', TimeLine);
