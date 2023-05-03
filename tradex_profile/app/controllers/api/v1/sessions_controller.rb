class Api::V1::SessionsController < ApplicationController
  skip_before_action :authorize_user, only: :create

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { id: @user.id, name: @user.name }
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    render json: { logged_out: true }, status: :ok
  end
end
