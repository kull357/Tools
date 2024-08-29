function renameFiles() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const popup = document.getElementById('popup');
    fileList.innerHTML = '';

    if (fileInput.files.length === 0) {
        alert('Please select a folder containing images.');
        return;
    }

    const files = Array.from(fileInput.files);
    const zip = new JSZip();

    files.forEach((file) => {
        let originalName = file.name;
        let newName = originalName
            .toLowerCase()
            .replace(/\s+/g, '-')    // Replace spaces with hyphens
            .replace(/_/g, '-')      // Replace underscores with hyphens
            .replace(/-+/g, '-');    // Replace multiple hyphens with a single hyphen

        const li = document.createElement('li');
        li.textContent = `Original: ${originalName} => New: ${newName}`;
        fileList.appendChild(li);

        zip.file(newName, file); // Add the renamed file to the zip
    });

    // Once the renaming and zipping is done, show the popup
    popup.style.display = "flex";

    // Save the zip file to trigger download when the user clicks the button
    window.downloadZip = function() {
        zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, "renamed_images.zip");
        });
    };
}
