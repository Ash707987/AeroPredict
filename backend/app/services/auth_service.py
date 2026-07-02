from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate

from app.core.security import (
    create_access_token,
    verify_password,
)
from app.schemas.auth import LoginRequest, TokenResponse

def register_user(
    db: Session,
    user_data: UserCreate,
) -> User:

    existing_user = UserRepository.get_by_email(
        db=db,
        email=user_data.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    return UserRepository.create(
        db=db,
        user=user,
    )
    
def login_user(
    db: Session,
    login_data: LoginRequest,
) -> TokenResponse:

    user = UserRepository.get_by_email(
        db=db,
        email=login_data.email,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(
        subject=user.email,
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
    )