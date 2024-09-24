module Api
  module V1
    class UsersController < ApplicationController
      def show
        user = User.find(params[:id])
        render json: { id: user.id, name: user.name, history: user.history }
      rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: { id: user.id, name: user.name }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:name)
      end
    end
  end
end