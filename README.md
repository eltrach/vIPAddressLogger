# IP Address Logger

This script captures the IP address of users who visit a specific link and sends it to a Discord webhook. It also retrieves location information for the IP address using the ipinfo.io API.

## Usage

1. Set up a Discord webhook and add the URL to your project's environment variables as `WEBHOOK_URL`.

2. Ensure you have a valid ipinfo.io API token and add it to your project's environment variables as `IPINFO_TOKEN`.

3. Include the script in your Next.js project's middleware and deploy the project.

4. When a user visits the link, their IP address will be logged, and location information will be sent to the Discord webhook.

## Deployment

To deploy the IP Address Logger script using Next.js, follow these steps:

1. Clone the repository:

   ```sh
   git clone git@github.com:eltrach/vIPAddressLogger.git
   ```

2. Navigate to the project directory:
   ```sh
   cd vIPAddressLogger
   ```

3. Install dependencies:
   ```sh
   npm install
   ```
   Or
    ```sh
    bun install
    ```

4. Set up your environment variables:

   - Create a `.env` file in the root of your project.
   - Add your Discord webhook URL and ipinfo.io API token to the `.env` file:
     ```sh
     WEBHOOK_URL=your_discord_webhook_url_here
     IPINFO_TOKEN=your_ipinfo_io_api_token_here
     ```

5. Build and start your Next.js project:

   ```sh
   npm run build
   npm run start
   ```

6. Your Next.js project with the IP Address Logger should now be deployed and ready to capture and log IP addresses.

## Notes

- Ensure that you have proper permissions and compliance with privacy laws when logging IP addresses.
- Consider the security implications of logging and storing IP addresses.
