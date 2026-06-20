export const parseFAQBlock = (html) => {
  const faqRegex =
    /<div class="wp-block-uagb-faq[\s\S]*?<\/div><\/div><\/div>/;

  const faqMatch = html.match(faqRegex);

  if (!faqMatch) {
    return {
      cleanedContent: html,
      faqs: [],
    };
  }

  const faqHtml = faqMatch[0];

  const faqItemRegex =
    /<span class="uagb-question">[\s\S]*?<strong><strong>(.*?)<\/strong><\/strong><\/span>[\s\S]*?<div class="uagb-faq-content"><p>(.*?)<\/p><\/div>/g;

  const faqs = [];

  let itemMatch;

  while ((itemMatch = faqItemRegex.exec(faqHtml)) !== null) {
    faqs.push({
      question: itemMatch[1],
      answer: itemMatch[2],
    });
  }

  const cleanedContent = html.replace(faqRegex, "");

  return {
    cleanedContent,
    faqs,
  };
};