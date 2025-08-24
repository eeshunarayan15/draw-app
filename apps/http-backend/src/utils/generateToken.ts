import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common";

console.log('JWT_SECRET in generateToken:', JWT_SECRET);

interface User {
    id: string | number;
    email: string;
    name: string;
    mobileNumber: string;
}

export default (user: User) => {
    console.log('🔧 generateToken called with user:', {
        id: user.id,
        email: user.email,
        name: user.name,
        mobileNumber: user.mobileNumber
    });

    try {
        // Simple payload - minimal for testing
        const payload = {
            email: user.email,
            name: user.name,
            mobileNumber: user.mobileNumber,
        };

        console.log('📦 Payload:', payload);
        console.log('🔑 JWT_SECRET available:', !!JWT_SECRET);
        console.log('📏 JWT_SECRET length:', JWT_SECRET?.length);

        // Generate token with minimal options first
        const token = jwt.sign(
            payload,
            JWT_SECRET,
            {
                expiresIn: '1m',
                subject: String(user.id)
            }
        );

        console.log('✅ Token generated successfully');
        console.log('🎫 Full token:', token);
        console.log('📊 Token parts:', token.split('.').length);

        // Log each part
        const parts = token.split('.');
        console.log('🏷️  Header:', parts[0]);
        console.log('📄 Payload:', parts[1]);
        console.log('✍️  Signature:', parts[2]);

        return token;

    } catch (error) {
        console.error('❌ JWT Generation failed:', error);
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
    }
};