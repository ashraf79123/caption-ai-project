const  { GoogleGenAI } =require ("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateContent(base64ImageFile){


  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction:
      `You are a professional social media content creator and caption writer.
      Your job is to generate one highly attractive, creative, and engaging caption for the given image.
      Make the caption short, stylish, and catchy.
      Use trendy and relevant hashtags (3 to 5 max).
      Add fitting emojis to enhance expression.
      Think like a top Instagram influencer trying to grab attention.
      Avoid generic phrases and be as original and fun as possible.`

    }
  });
  return response.text;
}
module.exports=generateContent;