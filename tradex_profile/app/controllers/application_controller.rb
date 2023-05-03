class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable
  skip_before_action :verify_authenticity_token
  before_action :set_csrf_cookie
  before_action :authorize_user
  def cookie
    "ok"
  end

  private
  def authorize_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    unless @current_user
      render json: { error: "unauthorized" }, status: :unauthorized
    end
  end
  def render_unprocessable(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  private
  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = {
      value: form_authenticity_token,
      domain: :all
    }
  end
end
