async function make_pdf(resume_json)
{
    $("#download_button").addClass("disabled");
    const pdf_margin = 30;
    const accent_color = "#0586D7";
    const doc = new PDFDocument({size: "A4", margin: pdf_margin, bufferPages: true});

    let fonts = ["OpenSans-Regular", "OpenSans-Bold", "OpenSans-Light", "OpenSans-Italic", "OpenSans-BoldItalic", "OpenSans-LightItalic"];

    for(let i = 0; i < fonts.length; i++)
    {
        let font = await fetch(`/fonts/OpenSans/${fonts[i]}.ttf`);
        let arrayBuffer = await font.arrayBuffer();
        doc.registerFont(fonts[i], arrayBuffer);
    }

    let stream = doc.pipe(blobStream());
    
    // Starting line
    doc.lineWidth(3)
        .moveTo(pdf_margin, pdf_margin)
        .lineTo(doc.page.width-pdf_margin, pdf_margin)
        .stroke(accent_color);
    doc.moveDown();
    
    // Name
    doc.font(`OpenSans-Regular`).fill("black").fontSize(20).text(resume_json.name, {align: "center"});

    // Designation
    doc.font(`OpenSans-Regular`).fill(accent_color).fontSize(12).text(resume_json.job_title, {align: "center"});

    // Contact details
    let contact_details = resume_json.phone_numbers.concat(resume_json.emails, resume_json.websites, resume_json.location);
    doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(contact_details.join(" | "), {align: "center"});

    // Skills
    doc.moveDown();
    doc.font(`OpenSans-Bold`).fill(accent_color).fontSize(12).text("SKILLS", {align: "left"});
    doc.lineWidth(1)
        .moveTo(pdf_margin, doc.y)
        .lineTo(doc.page.width-pdf_margin, doc.y)
        .stroke(accent_color);
    
    doc.moveDown(0.5);

    doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text("Advanced Knowledge: ", {align: "left", continued: true});
    doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(resume_json.skills.advanced.join(", "), {align: "left"});

    doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text("Moderate Knowledge: ", {align: "left", continued: true});
    doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(resume_json.skills.moderate.join(", "), {align: "left"});

    doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text("Basic Knowledge: ", {align: "left", continued: true});
    doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(resume_json.skills.basic.join(", "), {align: "left"});

    // Experience
    doc.moveDown();
    doc.font(`OpenSans-Bold`).fill(accent_color).fontSize(12).text("EXPERIENCE", {align: "left"});
    doc.lineWidth(1)
        .moveTo(pdf_margin, doc.y)
        .lineTo(doc.page.width-pdf_margin, doc.y)
        .stroke(accent_color);
    
    doc.moveDown(0.5);

    resume_json.experiences.forEach(experience => {
        doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text(`${experience.company}, ${experience.location}`, {align: "left", continued: true});
        doc.font(`OpenSans-Italic`).fill("black").fontSize(10).text(` - ${experience.designation}`, {align: "left"});

        doc.font(`OpenSans-Light`).fill("black").fontSize(10).text(`${experience.start_date} - ${experience.end_date}`, {align: "left"});

        let experience_highlights = [];
        experience.experience_highlights.forEach(highlight => {
            experience_highlights.push(`${highlight.task} Tech used: ${highlight.tech_used}`);
        });
        doc.font(`OpenSans-Regular`).fill("black").fontSize(10).list(experience_highlights, {"bulletRadius": 2});
        doc.moveDown(0.5);
    });

    // Education
    doc.moveDown();
    doc.font(`OpenSans-Bold`).fill(accent_color).fontSize(12).text("EDUCATION", {align: "left"});
    doc.lineWidth(1)
        .moveTo(pdf_margin, doc.y)
        .lineTo(doc.page.width-pdf_margin, doc.y)
        .stroke(accent_color);
    
    doc.moveDown(0.5);

    resume_json.educational_qualifications.forEach(education => {
        doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text(`${education.organization}`, {align: "left", continued: true});
        doc.font(`OpenSans-Italic`).fill("black").fontSize(10).text(` - ${education.degree}`, {align: "left"});

        doc.font(`OpenSans-Light`).fill("black").fontSize(10).text(education.year_range, {align: "left"});
        doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(`Scored ${education.score}`, {align: "left"});
        doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(education.achievement, {align: "left"});
        doc.moveDown(0.5);
    });

    // Research papers
    doc.moveDown();
    doc.font(`OpenSans-Bold`).fill(accent_color).fontSize(12).text("RESEARCH PAPERS", {align: "left"});
    doc.lineWidth(1)
        .moveTo(pdf_margin, doc.y)
        .lineTo(doc.page.width-pdf_margin, doc.y)
        .stroke(accent_color);
    
    doc.moveDown(0.5);

    resume_json.research_papers.forEach(paper => {
        doc.font(`OpenSans-Bold`).fill("black").fontSize(10).text(`${paper.title}`, {align: "left"});
        doc.font(`OpenSans-Regular`).fill("black").fontSize(10).text(`${paper.date} - ${paper.location}`, {align: "left"});

        doc.font(`OpenSans-Light`).fill("black").fontSize(10).text(`[${paper.link}]`, {link: paper.link, align: "left"});
        doc.moveDown(0.5);
    });


    // Metadata
    doc.info.Title = `${resume_json.name} (Resume)`;
    doc.info.Subject = "Resume";
    doc.info.Author = resume_json.name;
    doc.info.Producer = resume_json.name;
    doc.info.Creator = resume_json.name;
    doc.end();
    stream.on('finish', () => {
        let a = document.createElement("a");
        a.href = stream.toBlobURL('application/pdf');
        a.setAttribute("download", `${doc.info.Title}.pdf`);
        a.click();
        $("#download_button").removeClass("disabled");
    });
}