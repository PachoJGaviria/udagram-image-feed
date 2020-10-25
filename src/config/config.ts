export const config = {
  'db': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect': process.env.DB_DIALECT,
  },
  'aws': {
    'aws_region': process.env.AWS_REGION,
    'aws_profile': process.env.AWS_PROFILE,
    'aws_media_bucket': process.env.AWS_MEDIA_BUCKET,
    'aws_access_key': process.env.AWS_ACCESS_KEY_ID,
    'aws_access_secret': process.env.AWS_SECRET_ACCESS_KEY,
  },
  'service': {
    'clientsUrls': process.env.CLIENTS_URLS,
  },
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
