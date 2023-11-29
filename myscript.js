document.addEventListener("DOMContentLoaded", function () {
    const text1Area = document.getElementById("text1");
    const text2Area = document.getElementById("text2");
    const compareButton = document.getElementById("compareBtn");
    const matchingMessage = document.getElementById("matchingMessage");
    const nonMatching1 = document.getElementById("nonMatching1");
    const nonMatching2 = document.getElementById("nonMatching2");
    const wordCount1 = document.getElementById("wordCount1");
    const wordCount2 = document.getElementById("wordCount2");
    const NonMatchingHeading1 = document.getElementById("a");
    const NonMatchingHeading2 = document.getElementById("b");

    let isCompared = false;

    function updateWordCount(textArea, wordCountElement) {
        const words = textArea.value.split(/\s+/).filter(Boolean).length;
        wordCountElement.textContent = `Word Count: ${words}`;
    }

    function compareText() {
        const text1 = text1Area.value;
        const text2 = text2Area.value;

        if (text1 === text2) {
            matchingMessage.style.display = "block";
            nonMatching1.style.display = "none";
            nonMatching2.style.display = "none";
            NonMatchingHeading1.style.display = "none";
            NonMatchingHeading2.style.display = "none";
            nonMatchingCount1.style.display = "none";
            nonMatchingCount2.style.display = "none";
        } else {
            const words1 = text1.split(/\s+/).filter(Boolean);
            const words2 = text2.split(/\s+/).filter(Boolean);

            const nonMatchingWords1 = [];
            const nonMatchingWords2 = [];

            for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
                if (words1[i] !== words2[i]) {
                    nonMatchingWords1.push(words1[i]);
                    nonMatchingWords2.push(words2[i]);
                }
            }

            nonMatching1.innerHTML = highlightNonMatchingWords(text1, nonMatchingWords1);
            nonMatching2.innerHTML = highlightNonMatchingWords(text2, nonMatchingWords2);

            nonMatching1.style.display = "block";
            nonMatching2.style.display = "block";
            matchingMessage.style.display = "none";
            NonMatchingHeading1.style.display = "block";
            NonMatchingHeading2.style.display = "block";
            nonMatchingCount1.style.display = "block";
            nonMatchingCount2.style.display = "block";

            // Update the non-matching word counts
            document.getElementById("nonMatchingCount1").textContent = `Non-Matching Word Count: ${nonMatchingWords1.length}`;
            document.getElementById("nonMatchingCount2").textContent = `Non-Matching Word Count: ${nonMatchingWords2.length}`;
        }

        isCompared = true;
    }

    function highlightNonMatchingWords(text, nonMatchingWords) {
        let highlightedText = text
            .split(/\s+/)
            .map(word => {
                if (nonMatchingWords.includes(word)) {
                    return `<span class="highlight">${word}</span>`;
                } else {
                    return word;
                }
            })
            .join(" ");
        return highlightedText;
    }

    function updateCompareButtonState() {
        if (text1Area.value.trim() !== "" && text2Area.value.trim() !== "") {
            compareButton.disabled = false;
        } else {
            compareButton.disabled = true;
            matchingMessage.style.display = "none";
            // Reset values if text areas are empty after comparing
            // Call resetValues() if you define this function
        }
    }

    function handleTextChange() {
        updateWordCount(this, this === text1Area ? wordCount1 : wordCount2);
        updateCompareButtonState();

        if (isCompared) {
            compareText();
        }
    }

    function cleanPastedText(text) {
        return text.replace(/\s+/g, ' ').trim();
    }

    text1Area.addEventListener("input", function (event) {
        if (event.inputType === 'insertFromPaste') {
            this.value = cleanPastedText(this.value);
        }
        handleTextChange.call(this);
    });

    text2Area.addEventListener("input", function (event) {
        if (event.inputType === 'insertFromPaste') {
            this.value = cleanPastedText(this.value);
        }
        handleTextChange.call(this);
    });

    compareButton.addEventListener("click", function () {
        compareText();
    });

    updateCompareButtonState();
});
