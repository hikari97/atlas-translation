import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((s) => s.length > 0);

  return (
    <Box py={2} px={4} bg="transparent">
      <Breadcrumb spacing="8px" separator="/">
        <BreadcrumbItem>
          <Link href="/" passHref>
            <BreadcrumbLink color="blue.500" fontSize="sm" fontWeight="medium">Home</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const path = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <BreadcrumbItem key={path} isCurrentPage={isLast}>
              {isLast ? (
                <Box color="gray.500" fontSize="sm" fontWeight="medium">
                  {label.includes('?') ? label.split('?')[0] : label}
                </Box>
              ) : (
                <Link href={path} passHref>
                  <BreadcrumbLink color="blue.500" fontSize="sm" fontWeight="medium">
                    {label}
                  </BreadcrumbLink>
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
}
