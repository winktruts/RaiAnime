export default async function handler(req, res) {
  const data = [
    {
      title: 'Demon Slayer',
      thumbnail: 'https://placehold.co/300x400?text=Demon+Slayer',
      genre: ['Action', 'Supernatural'],
      link: 'https://samehadaku.bz/demon-slayer',
      synopsis: 'Seorang anak muda melawan iblis untuk menyelamatkan adiknya.',
      jadwal: '2025-06-10'
    },
    {
      title: 'One Piece',
      thumbnail: 'https://placehold.co/300x400?text=One+Piece',
      genre: ['Adventure', 'Comedy'],
      link: 'https://samehadaku.bz/one-piece',
      synopsis: 'Petualangan bajak laut mencari harta karun legendaris.',
      jadwal: '2025-06-12'
    }
  ];
  res.status(200).json({ data });
}
