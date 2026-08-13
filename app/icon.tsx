import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default async function Icon() {
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/tinos/Tinos-Regular.ttf',
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: '#140f16',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f0e8ef',
          fontSize: 22,
          fontFamily: 'Times New Roman',
          fontWeight: 400,
        }}
      >
        H
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Times New Roman',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
}
