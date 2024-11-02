function make_website(resume_json)
{
    $("#name").html(resume_json.name);
    $("#job_title").html(resume_json.job_title);

    let contact_details_list = [];
    resume_json.emails.forEach( email => {
        contact_details_list.push(`<a href="mailto:${email}" target="_blank"> <i class="fa-solid fa-envelope"></i> ${email}</a>`);
    });
    resume_json.websites.forEach( website => {
        contact_details_list.push(`<a href="${website}" target="_blank"><i class="fa-solid fa-link"></i> ${website}</a>`);
    });
    resume_json.social_links.forEach( link_obj => {
        contact_details_list.push(`<a href="${link_obj.url}" target="_blank">${get_social_link_icon(link_obj.site)} ${link_obj.url}</a>`);
    });
    $("#contact_details").html(contact_details_list.join("<br>"));

    $("#advanced_skills").html(resume_json.skills.advanced.join(", "));
    $("#moderate_skills").html(resume_json.skills.moderate.join(", "));
    $("#basic_skills").html(resume_json.skills.basic.join(", "));

    let research_papers_html = "";
    for(let i = 0; i < resume_json.research_papers.length; i++)
    {
        let paper = resume_json.research_papers[i];
        research_papers_html += `<div class="col-md-4 my-3 text-center ${i % 3 == 1 ? 'center-column' : ''}"><div class="v-100">`;
        research_papers_html += `<h5 class="fw-bold">${paper.title}</h5>`;
        research_papers_html += `${paper.date} - ${paper.location}<br>`;
        research_papers_html += `<a href="${paper.link}" target="_blank" style="font-size: 14px;"><i class="fa-solid fa-link"></i> ${paper.link}</a>`;
        research_papers_html += `<br/></div></div>`;
    }
    $("#research_papers").html(research_papers_html);


    const year = new Date().getFullYear();
    $("#copyright").html(`Copyright ${year} Dibyabiva Seth. All rights reserved.`);

    $("#content_div").show();
}

function get_social_link_icon(site)
{
    switch(site)
    {
        case "LinkedIn":
            return `<i class="fa-brands fa-linkedin"></i>`;
        case "ResearchGate":
            return `<i class="fa-brands fa-researchgate"></i>`;
        default:
            return `<i class="fa-solid fa-link"></i>`;
    }
}