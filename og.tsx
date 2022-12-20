import { serve } from "https://deno.land/std@0.154.0/http/server.ts";
import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.4/mod.ts";
const PORT = 8080;

const fontURL =
  "http://themes.googleusercontent.com/static/fonts/notosans/v1/LeFlHvsZjXu2c3ZRgBq9nKCWcynf_cDxXwCLxiixG1c.ttf";
const font = await fetch(fontURL).then((res) => res.arrayBuffer());

const imageUrl = "https://raw.githubusercontent.com/yashikota/og/master/bg.png";

const handler = async (req: Request) => {
  const fontData = await font;
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const fontSize = searchParams.get("size") || 100;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fontSize,
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {text}
    </div>,
    {
      width: 800,
      height: 450,
      emoji: "twemoji",
      fonts: [
        {
          name: "Noto Sans",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
};

await serve(handler, { port: PORT });
