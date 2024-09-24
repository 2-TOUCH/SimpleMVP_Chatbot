module Api
  module V1
    class UsersController < ApplicationController
      def index
        if params[:id]
          user = User.find_by(id: params[:id])
          if user
            render json: { id: user.id, name: user.name }
          else
            render json: { error: "User not found" }, status: :not_found
          end
        else
          render json: { error: "User ID is required" }, status: :bad_request
        end
      rescue => e
        Rails.logger.error "Error in UsersController#index: #{e.message}"
        render json: { error: "An unexpected error occurred" }, status: :internal_server_error
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: { id: user.id, name: user.name }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      rescue => e
        Rails.logger.error "Error in UsersController#create: #{e.message}"
        render json: { error: "An unexpected error occurred" }, status: :internal_server_error
      end

      def update
        user = User.find_by(id: params[:id])
        if user
          if params[:history_item].present?
            user.history = [] if user.history.nil?
            user.history << params[:history_item]
          end

          if user.update(user_params)
            render json: { message: "User updated successfully", user: { id: user.id, name: user.name, history: user.history } }
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: "User not found" }, status: :not_found
        end
      rescue => e
        Rails.logger.error "Error in UsersController#update: #{e.message}"
        render json: { error: "An unexpected error occurred" }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:name)
      end
    end
  end
end