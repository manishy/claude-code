'use client';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Link,
  Chip,
  Stack,
} from '@mui/material';
import {
  SportsEsports as GameIcon,
  Description as DocsIcon,
  School as LearnIcon,
  ViewModule as TemplateIcon,
  RocketLaunch as DeployIcon,
} from '@mui/icons-material';
import Image from 'next/image';

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: { xs: 2, md: 4 },
            mb: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Get started by editing{' '}
              <Chip
                label="src/app/page.tsx"
                variant="outlined"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  mx: 0.5,
                }}
              />
            </Typography>
          </Box>
          
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              By
            </Typography>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
              style={{ filter: 'invert(1)' }}
            />
          </Link>
        </Box>

        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
            style={{ filter: 'invert(1)' }}
          />
        </Box>

        {/* Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, md: 3 },
            width: '100%',
            maxWidth: 'lg',
          }}
        >
          {[
            {
              title: 'Tic Tac Toe',
              description: 'Play an interactive tic-tac-toe game built with Material-UI!',
              href: '/tic-tac-toe',
              icon: <GameIcon />,
              isInternal: true,
            },
            {
              title: 'Docs',
              description: 'Find in-depth information about Next.js features and API.',
              href: 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
              icon: <DocsIcon />,
              isInternal: false,
            },
            {
              title: 'Learn',
              description: 'Learn about Next.js in an interactive course with quizzes!',
              href: 'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
              icon: <LearnIcon />,
              isInternal: false,
            },
            {
              title: 'Deploy',
              description: 'Instantly deploy your Next.js site to a shareable URL with Vercel.',
              href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app',
              icon: <DeployIcon />,
              isInternal: false,
            },
          ].map((item, index) => (
            <Card
              key={index}
              component={Link}
              href={item.href}
              target={item.isInternal ? '_self' : '_blank'}
              rel={item.isInternal ? '' : 'noopener noreferrer'}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                minHeight: { xs: 140, md: 160 },
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  p: { xs: 2, md: 3 },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {item.icon}
                  <Typography variant="h6" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ ml: 'auto' }}>
                    →
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
