import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Input, Select } from '../components/ui/FormElements';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'Student' as 'Student' | 'Society',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setServerError('');

    try {
      try {
        const response = await axiosInstance.post('/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          type: formData.type,
        });

        // If the backend returns a token or success flag, handle accordingly
        // For example, storing token and redirecting:
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } catch (err: any) {
        if (err.response?.status === 409) {
          // Assuming 409 Conflict for existing email
          setServerError('This email is already registered');
        } else {
          setServerError('An error occurred during signup. Please try again.');
        }
      }

    } catch (err) {
      setServerError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Join Campus Cart to buy and sell items
              </p>
            </div>

            {serverError && (
              <div className="bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 p-3 rounded-md mb-4">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={<User size={18} />}
                error={errors.name}
                required
                fullWidth
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={18} />}
                error={errors.email}
                required
                fullWidth
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                icon={<Lock size={18} />}
                error={errors.password}
                helperText="Password must be at least 6 characters"
                required
                fullWidth
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={<Lock size={18} />}
                error={errors.confirmPassword}
                required
                fullWidth
              />

              <Select
                label="Account Type"
                name="type"
                value={formData.type}
                onChange={(value) => setFormData(prev => ({ ...prev, type: value as 'Student' | 'Society' }))}
                options={[
                  { value: 'Student', label: 'Student' },
                  { value: 'Society', label: 'Society' },
                ]}
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
                icon={<UserPlus size={18} />}
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};