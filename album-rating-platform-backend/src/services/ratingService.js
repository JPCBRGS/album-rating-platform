const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAlbumRating = async (req, res) => {
    const { spotifyAlbumId } = req.params;

    console.log('Fetching ratings for album ID:', spotifyAlbumId); // Log para verificar o ID

    try {
        // Pega todas as avaliações para o álbum especificado
        const ratings = await prisma.rating.findMany({
            where: { spotifyAlbumId: spotifyAlbumId },
        });

        if (ratings.length === 0) {
            return res.json({
                averageRating: 0,
                totalRatings: 0,
            });
        }

        const totalRatings = ratings.length;
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;

        return res.json({
            averageRating: averageRating.toFixed(1), // Arredonda para uma casa decimal
            totalRatings: totalRatings,
        });
    } catch (error) {
        console.error('Error fetching album rating:', error);
        return res.status(500).json({ error: 'Failed to fetch album rating' });
    }
};

// Busca a avaliação específica do usuário para o álbum
exports.getUserAlbumRating = async (req, res) => {
    const { spotifyAlbumId, email } = req.params;

    try {
        // Busca o usuário pelo e-mail
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Pega a avaliação do álbum para o usuário
        const userRating = await prisma.rating.findFirst({
            where: {
                spotifyAlbumId: spotifyAlbumId,
                userId: user.id,
            },
        });

        if (!userRating) {
            return res.json({ userRating: null });
        }

        return res.json({ userRating: userRating.rating });
    } catch (error) {
        console.error('Error fetching user rating:', error);
        return res.status(500).json({ error: 'Failed to fetch user rating' });
    }
};

exports.createOrUpdateRating = async (req, res) => {
    const { spotifyAlbumId, rating, email } = req.body;

    try {
        // Busca o userId baseado no e-mail fornecido
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user.id;

        // Verifica se o usuário já avaliou o álbum
        const existingRating = await prisma.rating.findFirst({
            where: { userId: userId, spotifyAlbumId: spotifyAlbumId },
        });

        if (existingRating) {
            // Se já existe, atualiza a avaliação
            const updatedRating = await prisma.rating.update({
                where: { id: existingRating.id },
                data: { rating: rating },
            });
            return res.json({ message: 'Rating updated', rating: updatedRating });
        } else {
            // Caso contrário, cria uma nova avaliação
            const newRating = await prisma.rating.create({
                data: {
                    rating: rating,
                    user: { connect: { id: userId } }, // Relaciona com o usuário
                    spotifyAlbumId: spotifyAlbumId,
                },
            });
            return res.json({ message: 'Rating created', rating: newRating });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create or update rating' });
    }
};
