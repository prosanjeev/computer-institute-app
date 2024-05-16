
![demo](https://github.com/prosanjeev/computer-institute-app/assets/154009697/60052a35-523c-4171-9f41-1c3a3a7deaff)



cPanel ---
.htaccess
---code---
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
